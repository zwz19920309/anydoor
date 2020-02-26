<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  </meta>
  <meta name="viewport" content="width=device-width">
  </meta>
  <meta charset="UTF-8">
  </meta>
  <title>{{title}}</title>
  <style>
    body {
      margin: 30px;
    }

    a {
      display: block;
      font-size: 30px;
    }
  </style>
</head>

<body>
  {{#each files}}
  <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
  {{/each}}
</body>

</html>