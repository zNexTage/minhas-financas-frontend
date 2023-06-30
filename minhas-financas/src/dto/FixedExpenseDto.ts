class FixedExpenseDto {
    
    constructor(
        public description:string,
        public paymentCategory: string,
        public value?: number
    ) {        
        
    }
}

export default FixedExpenseDto;