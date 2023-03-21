import {Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if(error instanceof Error) {
        return res.status(404).json({
            message: error.message
        });
    }

    return res.status(500).json({
        message: `Internal seerver error - ${error}`
    });
}

export default errorHandler;