import React from "react";
import "./PlansTable.css";

export default function PlansTable() {
    return (
        <div className="plans-list">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Duração</th>
                        <th>Quantidade de vagas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mensal</td>
                        <td>70,00</td>
                        <td>30 dias</td>
                        <td>-</td>
                        <td>
                            <button className="btn edit">✏️</button>
                            <button className="btn delete">❌</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Mensal</td>
                        <td>70,00</td>
                        <td>30 dias</td>
                        <td>-</td>
                        <td>
                            <button className="btn edit">✏️</button>
                            <button className="btn delete">❌</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}