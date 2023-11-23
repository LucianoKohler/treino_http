const fs = require("fs");
const http = require("http");
const url = require("url");

function calculate(oper, n1, n2) {
  switch (oper) {
    case "add":
      return n1 + n2;
    case "sub":
      return n1 - n2;
    case "mul":
      return n1 * n2;
    case "div":
      return n1 / n2;
    default:
      return "Operação inválida";
  }
}

http
  .createServer((req, res) => {
    res.write("Calculadora\n");
    let query = url.parse(req.url, true).query;
    let oper = query.oper;
    let n1 = parseInt(query.n1);
    let n2 = parseInt(query.n2);
    if (!oper && !n1 && !n2) {
      res.write(
        "Coloque os parametros na url para calcular (exemplo): localhost:8000?oper=add&n1=1&n2=2"
      );
    } else {
      if (!isNaN(n1) && !isNaN(n2)) {
        let resultado = calculate(oper, n1, n2);

        fs.appendFile(
          "banco.txt",
          `${oper} de ${n1} com ${n2}: ${resultado.toString()};\n`,
          (err) => {
            if (err) throw err;
          }
        );

        res.write("Calculo feito com sucesso, resultado: " + resultado);
      } else {
        res.write("Operacao ou valores invalidos");
      }
    }
    res.end();
  })
  .listen(8000, () => console.log("localhost:8000"));
