import { Table } from "react-bootstrap"
import FixedExpense from "../../entities/FixedExpense"



interface IColumn {
    columnName: string,
    columnElement: (fixedExpense: FixedExpense) => React.ReactNode;
}

interface IProps {
    isLoading: boolean,
    fixedExpenses: Array<FixedExpense>,
    newColumns?: Array<IColumn>
}

const FixedExpenseTable = ({ fixedExpenses, isLoading, newColumns = [] }: IProps) => {
    const numberFormat = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    return (
        <Table striped bordered hover size="lg" className="mt-2">
            <thead>
                <tr>
                    <th>
                        Descrição
                    </th>
                    <th>
                        Valor
                    </th>
                    <th>
                        Categoria
                    </th>
                    {
                        newColumns.map(({ columnName }) => (
                            <th>
                                {columnName}
                            </th>
                        ))
                    }
                </tr>
            </thead>

            <tbody>
                {!isLoading &&
                    <>
                        {
                            fixedExpenses.length > 0 &&
                            <>
                                {
                                    fixedExpenses.map(fixedExpense => (
                                        <tr key={fixedExpense.id}>
                                            <td>{fixedExpense.description}</td>
                                            <td>{
                                                fixedExpense.value ?
                                                    numberFormat.format(fixedExpense.value)
                                                    :
                                                    "-"
                                            }
                                            </td>
                                            <td>{fixedExpense.paymentCategory}</td>
                                            {
                                                newColumns.map(({ columnElement }) => {
                                                    return (
                                                        <td>
                                                            {columnElement(fixedExpense)}
                                                        </td>
                                                    )
                                                })

                                            }
                                        </tr>
                                    ))
                                }




                            </>

                        }
                        {fixedExpenses.length == 0 &&
                            <tr>
                                <td
                                    className="text-center"
                                    colSpan={3}>
                                    Nenhum registro encontrado
                                </td>
                            </tr>
                        }
                    </>
                }
                {isLoading && <tr>
                    <td
                        className="text-center"
                        colSpan={3}>
                        Aguarde
                    </td>
                </tr>
                }
            </tbody>
        </Table>
    )
}

export default FixedExpenseTable;