export const validation= (schema)=>
{
    return (req,res,next)=>
    {
        const errorarray= []
        const validationkeys = ['query','keys','body','params','file','files']
        for(const key of validationkeys)
        if(schema[key])
        {
            const result = schema[key].validate(req[key],{abortEarly:false})
            if(result?.error?.details){
                 errorarray.push (result.error.details)
            }
            if (errorarray.length)
            {
                res.json ({message :'validation error',errorarray})

            }
            else{
                next()
            }

        }
        
    }
}
