class ResiduoRPBI {
    constructor(area, tipo, peso) {
        this.area = area;
        this.tipo = tipo;
        this.peso = parseFloat(peso);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnAgregar = document.getElementById('btnAgregarResiduo');
    const inputArea = document.getElementById('areaHosp');
    const selectTipo = document.getElementById('tipoRPBI');
    const inputPeso = document.getElementById('pesoKg');
    const listaResiduos = document.getElementById('listaResiduos');
    const spanPunzo = document.getElementById('totPunzo');
    const spanPato = document.getElementById('totPato');

    let residuos = JSON.parse(localStorage.getItem('residuosRPBI')) || [];

    function actualizarInterfaz() {
        listaResiduos.innerHTML = '';
        let totalPunzo = 0;
        let totalPato = 0;

        residuos.forEach((residuo) => {
            if (residuo.tipo === 'punzocortante') {
                totalPunzo += residuo.peso;
            } else if (residuo.tipo === 'patologico') {
                totalPato += residuo.peso;
            }

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            const badgeClass = residuo.tipo === 'punzocortante' ? 'bg-danger' : 'bg-warning text-dark';
            const tipoTexto = residuo.tipo === 'punzocortante' ? 'Punzocortante' : 'Patológico';

            li.innerHTML = `
                <div>
                    <strong>Área:</strong> ${residuo.area} <br>
                    <span class="badge ${badgeClass} mt-1">${tipoTexto}</span>
                </div>
                <span class="fs-5 fw-bold">${residuo.peso} kg</span>
            `;
            listaResiduos.appendChild(li);
        });

        spanPunzo.textContent = totalPunzo.toFixed(1);
        spanPato.textContent = totalPato.toFixed(1);

        localStorage.setItem('residuosRPBI', JSON.stringify(residuos));
    }

    btnAgregar.addEventListener('click', () => {
        const area = inputArea.value.trim();
        const tipo = selectTipo.value;
        const peso = inputPeso.value;

        if (area === '' || peso === '' || isNaN(peso) || Number(peso) <= 0) {
            alert('Por favor, ingresa un área válida y un peso mayor a 0.');
            return;
        }

        const nuevoResiduo = new ResiduoRPBI(area, tipo, peso);
        residuos.push(nuevoResiduo);

        actualizarInterfaz();

        inputArea.value = '';
        inputPeso.value = '';
        inputArea.focus();
    });

    actualizarInterfaz();
});