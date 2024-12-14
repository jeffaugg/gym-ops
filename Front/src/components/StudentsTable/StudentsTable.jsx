import React from "react";
import "./StudentsTable.css";

export default function StudentsTable() {
    return (
        <div className="students-list">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ana Almeida</td>
                        <td>123.456.789-10</td>
                        <td>(88)991234567</td>
                        <td>Inativo</td>
                        <td>
                            <button className="btn edit">✏️</button>
                            <button className="btn delete">❌</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Pedro Siqueira</td>
                        <td>123.456.789-10</td>
                        <td>(88)991234567</td>
                        <td>Ativo</td>
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