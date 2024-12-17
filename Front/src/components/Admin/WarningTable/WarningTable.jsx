import React from "react";
import { toast } from "react-toastify";
import "./WarningTable.css";

export default function WarningTable({ warnings }) {

  const recipientTypeMap = {
    INSTRUCTORS: "Instrutores",
    STUDENTS: "Alunos",
    ALL: "Todos",
  };

  return (
    <div className="warnings-list">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Enviada para</th>
            {/* <th>Data</th> */}
          </tr>
        </thead>
        <tbody>
          {warnings.length > 0 ? (
            warnings.map((warning) => (
              <tr key={warning.id}>
                <td>{warning.title}</td>
                <td>{recipientTypeMap[warning.recipient_type] || "Desconhecido"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum aviso encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}