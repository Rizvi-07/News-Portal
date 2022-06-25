const config = {
    user :'sa',
    password :'x',
    server:'LAPTOP-2NVOF7TS',
    database:'NewsPortal',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS'
    },
    port : 1433,
    trustServerCertificate: true
}

module.exports = config;