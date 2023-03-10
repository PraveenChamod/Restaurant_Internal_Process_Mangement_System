// Method : POST
// End Point : "api/v1/serviceProvider/__________";
// Description : Add Supplier Order Item

export const addSupplierOrder = async(req,res)=>{
    try {
        const user = req.user;
        if(user.Role === "Manager"){
            const {Item,Quantity,Date} = req.body;
            const session = await mongoose.startSession();
            try {
                session.startTransaction();
                const neworder = await SupplierItem.create({
                    SupplierItem:Item,
                    SupplierItem:Quantity,
                    SupplierItem:Date
                })
                res.json(neworder);               
                session.endSession();
            
                res.status(201).json({
                    status: 'success',
                    message: 'successfully'
                })
            } catch (error) {
                res.status(500).json(error.message);
            }
        }
        else{
            res.status(401).json('Only Manager has access to do this operation');
        }
    } catch (error) {
        res.status(501).json(error.message);
    }
}