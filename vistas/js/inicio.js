var map = L.map('mapid').setView([-17.8175, -69.8069], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var topografia = L.geoJson(pucamarca,{
style: function(feature) {
  switch (feature.properties.Color){
    case 1 : return {color: '#CB3234',weight: 0.7};
    case 5 : return {color: '#3B83BD', dashArray: '3,3', weight: 1.2};
  }
},
"opacity": 0.4
}).addTo(map);

//Cargadores tiempo real
let marker1 = null,marker2 = null,marker3 = null,marker4 = null,marker5 = null,marker6 = null,marker7 = null;

var oneIcon   = L.icon({iconUrl: 'vistas/img/equipo/marker-1.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]}),
    twoIcon   = L.icon({iconUrl: 'vistas/img/equipo/marker-2.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]}),
    treeIcon  = L.icon({iconUrl: 'vistas/img/equipo/marker-3.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]}),
    fourIcon  = L.icon({iconUrl: 'vistas/img/equipo/marker-4.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]}),
    fiveIcon  = L.icon({iconUrl: 'vistas/img/equipo/marker-5.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]}),
    sixIcon   = L.icon({iconUrl: 'vistas/img/equipo/marker-6.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]}),
    sevenIcon = L.icon({iconUrl: 'vistas/img/equipo/marker-7.png',iconSize: [25, 41], iconAnchor: [12, 41], tooltipAnchor: [14,-25]});


const updateGps = () => {
  const urlgps = 'ajax/gpsonline.ajax.php'
  fetch(urlgps).then(res => res.json()).then(data => {

    let cam1 = document.querySelector('#cam1');
    let cam2 = document.querySelector('#cam2');
    let cam3 = document.querySelector('#cam3');
    let cam4 = document.querySelector('#cam4');
    let cam5 = document.querySelector('#cam5');
    let cam6 = document.querySelector('#cam6');
    let cam7 = document.querySelector('#cam7');

    camion = [cam1, cam2, cam3, cam4, cam5, cam6, cam7];

    for (i = 0; i < data.length; i++) {
      latlon = [];
      let xPuc, yPuc, zone, southhemi;
      xPuc = parseFloat(data[i].EASTING);
      yPuc = parseFloat(data[i].NORTHING);
      equipo = data[i].EQUIP_IDENT;
      estado = data[i].Estado;
      velocidad = parseFloat(data[i].SPEED);
      operadorS = data[i].Oper_Cargador;
      cargador = data[i].Cargador
      operadorH = data[i].Oper_Camion;
      camion = data[i].Camion;
      banco = data[i].Banco;
      poligono = data[i].Poligono;
      destino = data[i].Destino;
      id = data[i].id;
      zone = parseFloat(19);
      southhemi = true;
      UTMXYToLatLon(xPuc, yPuc, zone, southhemi, latlon);
      latnew = RadToDeg(latlon[1]);
      lonnew = RadToDeg(latlon[0]);

      if (id === 'CA01') {
        if (marker1) {
          map.removeLayer(marker1);
        }
        coord1 = [lonnew,latnew];
        cam1.addEventListener("click", ()=> {
          map.setView(coord1, 19, {
            animate: true
          });
        })
        marker1 = L.marker([lonnew, latnew], {icon: oneIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker1.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker1.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker1.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker1.bindTooltip(tooltip);
        }
      }
      else if (id === 'CA02') {
        if (marker2) {
          map.removeLayer(marker2);
        }
        coord2 = [lonnew,latnew];
        cam2.addEventListener("click", ()=> {
          map.setView(coord2, 19, {
            animate: true
          });
        })
        marker2 = L.marker([lonnew, latnew], {icon: twoIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker2.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker2.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker2.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker2.bindTooltip(tooltip);
        }
      }
      else if (id === 'CA03') {
        if (marker3) {
          map.removeLayer(marker3);
        }
        coord3 = [lonnew,latnew];
        cam3.addEventListener("click", ()=> {
          map.setView(coord3, 19, {
            animate: true
          });
        })
        marker3 = L.marker([lonnew, latnew], {icon: treeIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker3.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker3.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker3.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker3.bindTooltip(tooltip);
        }
      }
      else if (id === 'CA04') {
        if (marker4) {
          map.removeLayer(marker4);
        }
        coord4 = [lonnew,latnew];
        cam4.addEventListener("click", ()=> {
          map.setView(coord4, 19, {
            animate: true
          });
        })
        marker4 = L.marker([lonnew, latnew], {icon: fourIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker4.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker4.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker4.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker4.bindTooltip(tooltip);
        }
      }
      else if (id === 'CA05') {
        if (marker5) {
          map.removeLayer(marker5);
        }
        coord5 = [lonnew,latnew];
        cam5.addEventListener("click", ()=> {
          map.setView(coord5, 19, {
            animate: true
          });
        })
        marker5 = L.marker([lonnew, latnew], {icon: fiveIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker5.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker5.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker5.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker5.bindTooltip(tooltip);
        }
      }
      else if (id === 'CA06') {
        if (marker6) {
          map.removeLayer(marker6);
        }
        coord6 = [lonnew,latnew];
        cam6.addEventListener("click", ()=> {
          map.setView(coord6, 19, {
            animate: true
          });
        })
        marker6 = L.marker([lonnew, latnew], {icon: sixIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker6.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker6.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker6.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker6.bindTooltip(tooltip);
        }
      }
      else if (id === 'CA07') {
        if (marker7) {
          map.removeLayer(marker7);
        }
        coord7 = [lonnew,latnew];
        cam7.addEventListener("click", ()=> {
          map.setView(coord7, 19, {
            animate: true
          });
        })
        marker7 = L.marker([lonnew, latnew], {icon: sevenIcon}).addTo(map);
        if (estado === 'Transportando') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Operador:</strong> ${operadorH}<br>
            <strong>Origen:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker7.bindTooltip(tooltip);
        } else if (estado === 'Vacio') {

          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
                    <strong>Operador:</strong> ${operadorH}<br>
                    <strong>Destino:</strong> [ ${banco} ] <strong class="text-success">${poligono}</strong> <br>
                    <strong>Estado:</strong> ${estado} <br>
                    <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker7.bindTooltip(tooltip);
        } else if (estado === 'Cam Cargando') {
          let tooltip = L.tooltip({
            permanent: true
          }).setContent(`<strong>[ ${equipo} ]</strong><br>
            <strong>Unidad Carga:</strong> ${cargador} <br>
            <strong>Operador UC:</strong> ${operadorS} <br>
            <strong>Operador Camión:</strong> ${operadorH} <br>
            <strong>Banco:</strong> ${banco} <br>
            <strong>Polígono:</strong> ${poligono} <br>
            <strong>Destino:</strong> ${destino} <br>
            <strong>Estado:</strong> ${estado} <br>
            <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker7.bindTooltip(tooltip);
        } else {
          let tooltip = L.tooltip().setContent(`<strong>[ ${equipo} ]</strong><br>
          <strong>Operador Camión:</strong> ${operadorH} <br>
          <strong>Estado:</strong> ${estado} <br>
          <strong>Velocidad:</strong> ${velocidad} km/h`);
          marker7.bindTooltip(tooltip);
        }
      }

    }
  })
  setTimeout(updateGps, 3000)
}
updateGps();