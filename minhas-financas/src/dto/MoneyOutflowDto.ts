class MoneyOutflowDto {   

    constructor(
        public description: string,
        public value: number,
        public quantity: number,
        public paymentMethod: string,
        public paymentLocation: string,
        public paymentCategory: string,
        public date: string,
        public id?: string
    ) {
        
    }
    
    
}

export default MoneyOutflowDto;