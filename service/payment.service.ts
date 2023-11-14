import {Payment} from "../model/payment.model"
import axios from "axios"

import db from "../model/database"
import config  from "../config/config"

const PaymentRepository = db.typeorm.getRepository(Payment)

const PaymentService = {
    async createPayment(payload:any){
        try{
            let new_payment = new Payment()
            new_payment.id_table = payload.id_table
            new_payment.id_order = payload.id_order
            new_payment.overall_price = payload.overall_price
            new_payment.user_name = payload.user_name
            let payment = await PaymentRepository.save(new_payment)
            return payment
        }catch(error){
            console.log(error)
            throw(error)
        }
    },

    async getPayment(id:number){
        try{
            let Payment = await PaymentRepository.findOne({
                where:{
                    id_payment:id,
                    is_delete:false
                }
            })
            console.log(Payment)
            return Payment
        }catch(error){
            console.log(error)
            throw(error)
        }
    },

    async getAllPayment(filter:any){
        try{
            let all_payment = await PaymentRepository.findAndCount({
                where:{
                    ...filter,
                    is_delete:false
                }
            })

            return all_payment
        }catch(Error){
            throw(Error)
        }
    },

    async updatePayment(id:number,payload:any){
        try {
            let Payment = await PaymentRepository.findOne({
                where:{
                    id_payment:id,
                    is_delete:false
                }
            })
            if(!Payment){
                return null
            }
            return await PaymentRepository.save({
                ...Payment,
                ...payload
            })
        } catch (error) {
            console.log(error)
            throw(error)
            
        }
    },

    async deletePayment(id:number){
        try{
            let Payment = await PaymentRepository.findOne({
                where:{
                    id_payment:id
                }
            })
            if(!Payment){
                return null
            }
            Payment.is_delete = true
            return await PaymentRepository.save(Payment)
        }catch(error){
            console.log(error)
            throw(error)
        }
    },

    async getBill(id_table:number){
        try{
            const orders = await axios.get(`${config.api_gateway_url}:${config}/order/all/:${id_table}`)
            if(!orders.data.data){
                return []
            }
            return orders.data
        }catch(error){
            throw(error)
        }
    }
}

export default PaymentService