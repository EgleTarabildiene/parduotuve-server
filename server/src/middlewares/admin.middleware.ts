const adminMiddleware=(req:any, res:any, next:any)=>{
    
    if (req.user==null){
        return res.status(401).json({
            'text':'Vartotojas nėra prisijungęs'
        });
    }
    
    if (req.user.type==0){
        next();
    }else{
        return res.status(401).json({
            'text':'Vartotojas neturi teisių atlikti veiksmus'
        });
    }
};


export {adminMiddleware};