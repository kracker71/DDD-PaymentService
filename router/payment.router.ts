import { Router } from "express";
import PaymentController from "../controller/payment.controller";

const router = Router()

router.post("/create",PaymentController.createPayment)

router.get("/all",PaymentController.getAllPayment)

router.get("/:id",PaymentController.getPayment)

router.put("/update/:id",PaymentController.updatePayment)

router.put("/delete/:id",PaymentController.deletePayment)

export default router