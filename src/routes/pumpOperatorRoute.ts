import { Router } from "express";
import { createPumpOperator, deleteOperator, getPumpOperatorByid, updateOperator } from "../controllers/pumpOperatorController";
const route = Router()

route.post('/create', async (req, res, next) => {
    const name: string = req.body.name 
    const address: string = req.body.address 
    const phone: string = req.body.phone 
    const nic: string = req.body.nic 
    
    const pumpOperator = await createPumpOperator(name, address, phone, nic)

    return res.status(pumpOperator.status).json(pumpOperator)
})

route.post('/update', async (req, res, next) => {
    const id: number = req.body.id 
    const name: string = req.body.name 
    const phone: string = req.body.phone 
    const nic: string = req.body.nic 
    const balance: number = req.body.balance 
    const address: string = req.body.address

    const pumpOperator = await updateOperator(id, name, address, phone, nic, balance)
    return res.status(pumpOperator.status).json(pumpOperator)
})

route.get('/:id', async(req, res, next) => {
    const pumpOperator = await getPumpOperatorByid(req.body.id)
    return res.status(pumpOperator.status).json(pumpOperator)
})

route.post('/delete', async(req, res, next) => {
    const id: number = req.body.id 
    const pumpOperator = await deleteOperator(id)
    return res.status(pumpOperator.status).json(pumpOperator)
})

module.exports = route