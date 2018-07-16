const uuid = require('uuid');
multer = require('multer')

var storage = multer.memoryStorage();
var upload = multer()

var AccountKey = "pigjjJ0yrHCnfyLtX2W4bL8pVpYfegW36F+24geQ2OruWMMdQHvkY6PmOAuWIClSJuuydIHgTzbNiVuvUiMZTg==";
var AccountName = "vsplitstorage";
var storageConnectionString = 'DefaultEndpointsProtocol=https;AccountName=vsplitstorage;AccountKey=pigjjJ0yrHCnfyLtX2W4bL8pVpYfegW36F+24geQ2OruWMMdQHvkY6PmOAuWIClSJuuydIHgTzbNiVuvUiMZTg==;EndpointSuffix=core.windows.net'

var azureSorage = require('azure-storage');
var blobSvc = azureSorage.createBlobService(AccountName,AccountKey);
var streamifier = require('streamifier');

exports.propic =(function (req, res) {
//      console.log('##############req.files');
//          console.log(req.files);


//  console.log('########empty'+req.files['profile_url'][0].size)
    // if(req.files['profile_url'][0] == {}){
    //     console.log('empty')
    // }
    // else{
    //     console.log('not')
    // }
    console.log(req.files);
   var file = req.files['profile_url'][0].originalname;
   var file_name = uuid()+file
   var size =  req.files['profile_url'][0].size;
    console.log(file_name)
 var stream = streamifier.createReadStream(req.files['profile_url'][0].buffer);
  var  uploadImage =  blobSvc.createBlockBlobFromStream(
            'vsplitcontainer',
             file_name,
             stream,
             size,
            function(error, result, response){
                if(error){
                    console.log("Couldn't upload stream");
                    console.error(error);
                } else {
                    console.log('Stream uploaded successfully');
                    console.log(file_name)
                }
        })
        return file_name;
})
