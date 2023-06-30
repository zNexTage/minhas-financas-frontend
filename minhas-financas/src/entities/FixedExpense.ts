class FixedExpense {
    
    constructor(
        public id:number,
        public description:string,
        public paymentCategory: string,
        public value?: number
    ) {        
        
    }
}

export default FixedExpense;