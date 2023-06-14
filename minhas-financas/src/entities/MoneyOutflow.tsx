class MoneyOutflow {   

    constructor(
        public description: string,
        public value: number,
        public quantity: number,
        public paymentMethod: string,
        public paymentLocation: string,
        public paymentCategory: string,
        public date: Date,
        public id?: string
    ) {
        
    }

    public getFormatedValue():string {
        const numberFormat = new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' });

        return numberFormat.format(this.value);
    }

    public getTotal(): number {
        return this.value * this.quantity;
    }

    public getFormatedTotal():string {
        const numberFormat = new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' });

        return numberFormat.format(this.getTotal());
    }
    
    
}

export default MoneyOutflow;