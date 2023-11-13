import PaymentService from "../service/payment.service"
import {Payment} from "../model/payment.model"
import { Request,Response } from "express"

const PaymentController = {
    async createPayment(req:Request,res:Response,next:any){
        const payload  = req.body
        try {
            const result = await PaymentService.createPayment(payload)
            return res.status(200).send({
                status:"success",
                data:result
            })
        } catch (error) {
            return res.status(500).send({
                status:"error",
                message:"Internal Server Error"
            })
        }
    },

    async getPayment(req:Request,res:Response,next:any){
        try{
            const {id} = req.params
            const payment = await PaymentService.getPayment(Number(id))
            return res.status(200).send({
                status:"success",
                data:payment
            })
        }catch(error){
            return res.status(500).send({
                status:"error",
                message:"Internal Server Error"
            })
        }
    },

    async getAllPayment(req:Request,res:Response,next:any){
        try {
            const filter = req.query
            const all_payment = await PaymentService.getAllPayment(filter)
            return res.status(200).send({
                status:"success",
                data: all_payment
            })
        } catch (error) {
            return res.status(500).send({
                status:"error",
                message:"Internal Server Error"
            })
        }
    },

    async updatePayment(req:Request,res:Response,next:any){
        try {
            let {id} = req.params
            const payload = req.body
            const result = await PaymentService.updatePayment(Number(id),payload)
            return res.status(200).send({
                status:"success",
                message:`Update Payment id: ${id} successfully`
            })
        } catch (error) {
            return res.status(500).send({
                status:"error",
                message:"Internal Server Error"
            })
        }
    },

    async deletePayment(req:Request,res:Response,next:any){
        try{
            const {id} = req.params
            const payment = await PaymentService.getPayment(Number(id))
            if(!payment){
                return res.status(404).send({
                    message:"Payment not found"
                })
            }
            const result = await PaymentService.deletePayment(Number(id))
            return res.status(200).send({
                status:"success",
                message:`Delete id ${id} successfully`
            })
        }catch(error){
            return res.status(500).send({
                status:"error",
                message:"Internal Server Error"
            })
        }
    }
}

export default PaymentController