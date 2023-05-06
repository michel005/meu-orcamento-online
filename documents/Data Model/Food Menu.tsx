type MenuSectionList = {
    sections: (ListOfItems | HeaderAndContent | SimpleItem)[]
}

type ListOfItems = {
    name: string,
    items: ItemWithPrice[]
}

type HeaderAndContent = {
    header: string,
    content: string
}

type SimpleItem = ItemWithPrice & {
    description?: string,
}

type Item = {
    name: string,
    description?: string,
    image: string
}

type PriceUnity = 'Unidade' | 'Combo'

type ItemWithPrice = {
    item: Item | Item[],
    price: number
    priceUnity: PriceUnity
}

export const FoodMenu:MenuSectionList  = {
    sections: [
        {
            header: 'Bem vindo ao Restaurante Fácil',
            content: ''
        },
        {
            item: {
                name: 'Hamburger do Chefe',
                description: 'Hambúrguer exclusivo com pão fofinho, carne de costela, queijo chedar, cebola roxa, tomate, presunto e molho da casa.',
                image: 'http://image/item/1'
            },
            price: 1200,
            priceUnity: "Unidade"
        },
        {
            description: 'Um combo para matar aquela fominha que chega de surpresa',
            item: [
                {
                    name: 'Hamburger do Chefe',
                    description: 'Hambúrguer exclusivo com pão fofinho, carne de costela, queijo chedar, cebola roxa, tomate, presunto e molho da casa.',
                    image: 'http://image/item/1'
                },
                {
                    name: 'Batata rustica',
                    description: 'Batata temperada com sal e oregano e feita no forno.',
                    image: 'http://image/item/2'
                },
                {
                    name: 'Coca cola lata 350ml',
                    image: 'http://image/item/3'
                }
            ],
            price: 2000,
            priceUnity: "Unidade"
        }
    ]
}