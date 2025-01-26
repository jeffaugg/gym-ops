import React, { useEffect, useState } from "react";
import "./PresenceTable.css";
import { toast } from "react-toastify";
import { format } from "date-fns";
import api from "../../api";

export default function PresenceTable({ reload, onPresenceDeleted }) {
    const [presences, setPresences] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPresences = async () => {
        setLoading(true);
        try {
            const response = await api.get("/presence");
            setPresences(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar presenças:", error);
            toast.error("Erro ao buscar presenças.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPresences();
    }, [reload]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/presence/${id}`);
            toast.success("Presença deletada com sucesso!");
            onPresenceDeleted(); 
        } catch (error) {
            console.error("Erro ao deletar presença:", error);
            toast.error("Erro ao deletar presença.");
        }
    };

    return (
        <div className="presence-list">
            {loading && <div>Carregando detalhes...</div>}
            <table>
                <thead>
                    <tr>
                        <th>Nome do Aluno</th>
                        <th>CPF</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {presences.length > 0 ? (
                        presences.map((presence) => (
                            <tr key={presence.id}>
                                <td>{presence.aluno_id?.name || "N/A"}</td>
                                <td>{presence.aluno_id?.cpf || "N/A"}</td>
                                <td>
                                    {presence.data
                                        ? format(new Date(presence.data), "dd/MM/yyyy") 
                                        : "N/A"}
                                </td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDelete(presence.id)}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        !loading && (
                            <tr>
                                <td colSpan="4">Nenhuma presença encontrada.</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
