$(document).on('click', 'table', download);

function download(event)
{
  var tagType = event.target.tagName.toLowerCase();

  if ( "tr" != tagType && "td" != tagType ) return;

  var row = $(event.target);

  if ( "td" == tagType ) {
    row = $(event.target).parent();
  }

  var target = row.first().attr("data-target");

  $.ajax({
    type: "POST",
    url: "/download",
    dataType: 'json',
    data: { "target": target }
  });
}
