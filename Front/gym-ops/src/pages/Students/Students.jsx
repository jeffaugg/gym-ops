import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./Students.css";

function Students() {
  return (
    <div className="students">
      <Sidebar />
      <div className="students-content">
        <header className="students-header">
          <h1>Editar aluno</h1>
        </header>

        <div className="students-form">
          <form>
            <div className="form-group">
              <label>
                Nome*
                <input type="text" placeholder="Digite o nome" required />
              </label>
              <label>
                Data de nascimento*
                <input type="date" required />
              </label>
            </div>

            <div className="form-group">
              <label>
                CPF*
                <input type="text" placeholder="Digite o CPF" required />
              </label>
              <label>
                Gênero*
                <select required>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Planos*
                <select required>
                  <option value="">Selecione</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                </select>
              </label>
              <label>
                Telefone*
                <input type="text" placeholder="Digite o telefone" required />
              </label>
            </div>

            <div className="form-group">
              <label>
                Email*
                <input type="email" placeholder="Digite o email" required />
              </label>
              <label>
                Observações de saúde
                <input type="text" placeholder="Digite as observações" />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn salvar">Salvar</button>
              <button type="button" className="btn cancelar">Cancelar</button>
            </div>
          </form>
        </div>

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
      </div>
    </div>
  );
}

export default Students;
