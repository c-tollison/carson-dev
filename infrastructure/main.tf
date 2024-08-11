// Website files are stored in the S3
    // s3 bucket does not need to be public

// Route 53 routes traffic to the Cloud front distribution

//AWS certificate manager creates certificate for the domain
// terraform registry has this ish
//https://opentofu.org/docs/internals/module-registry-protocol/

// Cloud Front distribution 
    // Its point to the S3 bucket

// Lambda function that invalidates the cloud front cache whenever the static site content is updated