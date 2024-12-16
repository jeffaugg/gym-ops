// import React from "react";
// import "./StudentsTable.css";

// export default function StudentsTable() {
//     return (
//         <div className="students-list">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Nome</th>
//                         <th>CPF</th>
//                         <th>Telefone</th>
//                         <th>Status</th>
//                         <th>Ações</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Ana Almeida</td>
//                         <td>123.456.789-10</td>
//                         <td>(88)991234567</td>
//                         <td>Inativo</td>
//                         <td>
//                             <button className="btn edit">✏️</button>
//                             <button className="btn delete">❌</button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>Pedro Siqueira</td>
//                         <td>123.456.789-10</td>
//                         <td>(88)991234567</td>
//                         <td>Ativo</td>
//                         <td>
//                             <button className="btn edit">✏️</button>
//                             <button className="btn delete">❌</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
// }
import React from "react";
import "./StudentsTable.css";
import api from "../../api";
import { toast } from "react-toastify";

export default function StudentsTable({ students, onPlanDeleted }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      toast.success("Aluno deletado com sucesso!");
      onPlanDeleted();
    } catch (error) {
      console.error("Erro ao deletar o aluno:", error);
      toast.error("Erro ao deletar o aluno.");
    }
  };

  return (
    <div className="students-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.cpf}</td>
                <td>{student.telephone}</td>
                <td>
                  <button className="btn delete" onClick={() => handleDelete(student.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
