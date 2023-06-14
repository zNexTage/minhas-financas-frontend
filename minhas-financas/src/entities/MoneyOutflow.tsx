class MoneyOutflow {   

    private constructor(
        public description: string,
        public value: number,
        public quantity: number,
        public paymentMethod: string,
        public paymentLocation: string,
        public paymentCategory: string,
        public id?: string
    ) {

    }
}

export default MoneyOutflow;