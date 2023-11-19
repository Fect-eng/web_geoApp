/* ///////////////////
Js DataTable
///////////////////*/

$(function () {
    $("#puc_table").DataTable({
      /*"order": [[ 0, "desc" ],[2,"asc"]],*/
      "responsive": true,
      "lengthChange": false,
      "autoWidth": false,
      "pageLength": 10,
      "language": {
      "lengthMenu":"Mostrar _MENU_ registros por página.",
      "search" : "Buscar",
      "zeroRecords": "Lo sentimos. No se encontraron registros.",
      "info": "Página _PAGE_ de _PAGES_ de _TOTAL_ registros",
      "infoEmpty": "No hay registros aún.",
      "infoFiltered": "(Total _MAX_ registros)",
      "LoadingRecords": "Cargando...",
      "Processing": "Procesando...",
      "SearchPlaceholder": "Comience a teclear...",
      "paginate": {
      "previous": "Anterior",
      "next": "Siguiente",
      }
      },
      "buttons": [{extend: 'csv', text: 'CSV', title: 'csv__export'},
       {extend: 'excel', text: 'Excel', title: 'excel__export'},
      {extend: 'pdf', text: 'PDF', title: 'pdf__export' },]
    }).buttons().container().appendTo('#puc_table_wrapper .col-md-6:eq(0)');
  });
