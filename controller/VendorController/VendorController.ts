import {Request, Response, NextFunction} from 'express';

const VendorRegister = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from vendor reg" })
}

const VendorLogin = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from vendor log" })
}

export {
   VendorRegister,
   VendorLogin
}