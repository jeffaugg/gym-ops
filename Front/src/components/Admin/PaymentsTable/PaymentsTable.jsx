// import React from "react";
// import "./PaymentsTable.css";
// import api from "../../../api";
// import { toast } from "react-toastify";

// export default function PaymentsTable({ payments, onPlanDeleted }) {
//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/plan/${id}`);
//       toast.success("Plano deletado com sucesso!");
//       onPlanDeleted();
//     } catch (error) {
//       console.error("Erro ao deletar o pagamento:", error);
//       toast.error("Erro ao deletar o pagamento.");
//     }
//   };

//   return (
//     <div className="payments-list">
//       <table>
//         <thead>
//           <tr>
//             <th>Nome</th>
//             <th>Valor</th>
//             <th>Duração</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.length > 0 ? (
//             payments.map((plan) => (
//               <tr key={plan.id}>
//                 <td>{plan.name}</td>
//                 <td>R$ {plan.price.toFixed(2)}</td>
//                 <td>{plan.duration} dias</td>
//                 <td>
//                   <button className="btn delete" onClick={() => handleDelete(plan.id)}>
//                     ❌
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">Nenhum pagamento encontrado.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React from "react";
import "./PaymentsTable.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import api from "../../../api";
// import { toast } from "react-toastify";

export default function PaymentsTable() {
  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`/payment/${id}`);
  //     toast.success("Plano deletado com sucesso!");
  //     onPlanDeleted();
  //   } catch (error) {
  //     console.error("Erro ao deletar o pagamento:", error);
  //     toast.error("Erro ao deletar o pagamento.");
  //   }
  // };

  return (
    <div className="payments-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Plano</th>
            <th>Método de pagamento</th>
            <th>Data de pagamento</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td>Nome do titular</td>
                <td>123.456.789-00</td>
                <td>R$ 00,00</td>
                <td>Pix</td>
                <td>01/01/2024</td>
                <td className="botoes">
                  <button className="btn edit">
                    <FaRegEdit size={20}/>
                  </button>
                  <button className="btn delete">
                    <MdDeleteForever size={22}/>
                  </button>
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  );
}
