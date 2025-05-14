$(document).ready(function () {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#FF6384', // Soft Red
                    '#36A2EB', // Blue
                    '#FFCE56', // Yellow
                    '#4BC0C0', // Teal
                    '#9966FF', // Purple
                    '#FF9F40', // Orange
                    '#6D8B74', // Muted Green
                ],
                hoverBackgroundColor: [
                    '#E55373', // Darker Red
                    '#2A8CD6', // Darker Blue
                    '#E5B748', // Darker Yellow
                    '#3BA9A9', // Darker Teal
                    '#8856E3', // Darker Purple
                    '#E88A35', // Darker Orange
                    '#5B7863', // Darker Muted Green
                ],
                hoverBorderColor: "rgba(255, 255, 255, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#333333",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: true,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 75,
        },
    });

    $.ajax({
        url: '/chart-pie',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            const labels = response.labels;
            const chartData = response.data;
            myPieChart.data.labels = labels;
            myPieChart.data.datasets[0].data = chartData;
            myPieChart.update();
            let legendHTML = '';
            labels.forEach((label, index) => {
                legendHTML += `
                <span class="mr-2">
                    <i class="fas fa-circle" style="color:${myPieChart.data.datasets[0].backgroundColor[index]}"></i> 
                    ${label}
                </span>
            `;
            });
            document.querySelector('.mt-4.text-center.small').innerHTML = legendHTML;
        },
        error: function (xhr, status, error) {
            console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
        }
    });
});
