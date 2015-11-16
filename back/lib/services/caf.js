var request = require('request') ;
var fs = require('fs') ;
var Handlebars = require('handlebars');
var UrlAssembler = require('url-assembler');
var iconv = require('iconv-lite');
var Readable = require('stream').Readable

// L'ordre des paramètres de la requêtes est important
var query =`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://v1.ws.wsdemandedocumentweb.cnaf/">
    <soap:Header/>
    <soap:Body>
        <tns:demanderDocumentWeb xmlns:tns="http://v1.ws.wsdemandedocumentweb.cnaf/">
            <arg0>
                <app>WAT</app>
                <id>?</id>
                <beanEntreeDemandeDocumentWeb>
                    <codeAppli>WAT</codeAppli>
                    <codeOrganisme>{{ codeOrganisme }}</codeOrganisme>
                    <codePrestation>AF</codePrestation>
                    <codeSituation>1</codeSituation>
                    <dateDebutPeriode>01072015</dateDebutPeriode>
                    <dateEnvironement>01082015</dateEnvironement>
                    <dateFinPeriode>31072015</dateFinPeriode>
                    <matricule>{{numeroAllocataire}}</matricule>
                    <typeDocument>0</typeDocument>
                    <typeEnvoi>3</typeEnvoi>
                </beanEntreeDemandeDocumentWeb>
            </arg0>
        </tns:demanderDocumentWeb>
    </soap:Body>
</soap:Envelope>`;

//matricule : numéro d'allocataire CAF
//codeOrganisme : identifiant caisse CAF (récupération à partir du Code postal
//   ou Code insee (table de mapping)) fichier détenu par florian mais faux !


module.exports = CafService;



function CafService(options) {
  options = options || {};
  this.queryTemplate = Handlebars.compile(query);

  var sslCertificate = fs.readFileSync(options.cafSslCertificate);
  var sslKey = fs.readFileSync(options.cafSslKey);

  this.attestation = function(codeOrganisme, numeroAllocataire, callback) {
    var self = this;

    function hasBodyError(body){
      return body.indexOf("<codeRetour>0</codeRetour>") < 0
    }
    var parameters = {
      codeOrganisme: codeOrganisme,
      numeroAllocataire, numeroAllocataire
    }
    var queryWithParameters = this.queryTemplate(parameters);
    var url = UrlAssembler(options.cafHost)
                  .template('/sgmap/wswdd/v1')
                  .toString();

    request
        .post({
            url: url,
            body: queryWithParameters,
            headers: { 'Content-Type': 'text/xml; charset=utf-8' },
            gzip: true,
            cert: sslCertificate,
            key: sslKey,
            rejectUnauthorized: false,
            timeout: 10000,
            encoding: null
        })
        .on('error', err => callback(err))
        .on('response', res => {
            if (res.statusCode !== 200) return callback(new Error('Request error'));
            res.pipe(iconv.decodeStream('latin1')).collect(function(err, decodedBody) {
              if(err) return callback(err)
              if(hasBodyError(decodedBody)) return callback(new Error("The service has an error " + res.statusCode))
              var pdfText = self.getSecondPart(decodedBody);
              var pdfBuffer = iconv.encode(pdfText, 'latin1');
              callback(null, pdfBuffer);
            });
        });
  }


  //ARCHI SALE ==> REFACTOR
  this.getSecondPart = function getSecondPart(body) {
    var lines = body.split('\n');
    var separatorFound= 0;
    var newBody ='';
    for(var line = 0; line < lines.length; line++){
      if(lines[line].indexOf('--MIMEBoundaryurn_uuid_') === 0) {
        separatorFound++
        line += 2
      } else {
        if(separatorFound === 2) {
          newBody += lines[line]+"\n"
        }
      }
    }
    return newBody;
  }

}