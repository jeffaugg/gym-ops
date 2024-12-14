import React from "react";

import "./WarningTable.css";

export default function WarningTable() {
    return (
    <div className="mensagem-list">
          <table>
            <thead>
              <tr>
                <th>Título</th> 
                <th>Enviada para</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Novidades!</td>
                <td>Todos</td>
                <td>23/08/2019</td>
                <td><button className="delete">Excluir</button></td>
              </tr>
              <tr>
                <td>Atenção!</td>
                <td>Somente Instrutores</td>
                <td>22/04/2019</td>
                <td><button className="delete">Excluir</button></td>
              </tr>
            </tbody>
          </table>
        </div>
    )
}