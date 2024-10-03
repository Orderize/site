import { color } from "chart.js/helpers";
import { useEffect, useState } from "react";

function useChartData() {
    const [invoicingData, setInvoicingData] = useState(null);
    const [profitData, setProfitData] = useState(null);
    const [hourlyInvoicingData, setHourlyInvoicingData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                // const invoicingResponse = await fetch();
                // const profitReponse = await fetch();

                // const invoicingJson = await invoicingReponse.json();
                // const profitJson = await profitResponse.json();

                setInvoicingData({
                    data: {
                        labels: ["Delivery", "Salão"],
                        datasets: [{
                            label: "Faturamento (R$)",
                            data: [680, 2345],
                            backgroundColor: ["#7B806A", "#B5B9A4"], 
                            hoverOffset: 4, 
                            borderWidth: 5,
                            borderColor: "#EAE5DE",
                            borderRadius: 10,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                ticks: {
                                    color: "#EAE5DE",
                                },
                                grid: {
                                    color: "#EAE5DE",
                                },
                            }
                        },
                        plugins: {
                            legend: {
                                position: "right", 
                                labels: {
                                    font: {
                                        size: 20,
                                        weight: "bold",
                                        color: "#EAE5DE",
                                    },
                                    usePointStyle: true,
                                    pointStyle: "circle",
                                    padding: 20,
                                },
                            },
                        },
                        cutout: "42%",
                    },
                });

                setProfitData({
                    data: {
                        labels: [
                            "Lucro Diário", 
                            "Média Semanal", 
                            "Média Mensal",
                        ],
                        datasets: [{
                            label: false,
                            data: [ 3125, 3345, 3608, ], 
                            backgroundColor: ["#B5B9A4", "#B5B9A4", "#EAE5DE"],
                            borderRadius: 10,
                        }],
                    },
                    
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                                position: "bottom",
                                align: "center",
                                labels: {
                                    font: {
                                        color: "#EAE5DE",
                                        size: 20,
                                    }
                                
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: false,
                                    text: "Tipo de Lucro",
                                },

                                ticks: {
                                    color: "#EAE5DE",
                                },
                                
                                grid: {
                                    display: false,
                                },
                                color: "#EAE5DE",

                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Valor (R$)",
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                    color: "#EAE5DE",
                                },
                                ticks: {
                                    color: "#EAE5DE",
                                },
                                grid: {
                                    color: "#EAE5DE",
                                },
                                beginAtZero: true,
                            },
                        },
                    },
                });

                setHourlyInvoicingData({
                    data: {
                        labels: [
                            "08:00", "09:00", "10:00", "11:00", "12:00", 
                            "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
                        ],
                        datasets: [{
                            // label: "Faturamento (R$)",
                            data: [150, 300, 250, 400, 500, 600, 700, 800, 900, 950, 1100, 1200], // Exemplo de dados
                            borderColor: "#7B806A",
                            backgroundColor: "rgba(123, 128, 106, 0.2)",
                            borderWidth: 2,
                            fill: true, // Preenchendo a área abaixo da linha
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                                position: "top",
                                labels: {
                                    font: {
                                        size: 20,
                                        weight: "bold",
                                    },
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Horas do Dia",
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Faturamento (R$)",
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                },
                                beginAtZero: true,
                            },
                        },
                    },
                });

            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };

        fetchData();
    }, []);

    return { invoicingData, profitData, hourlyInvoicingData };

};

export default useChartData;