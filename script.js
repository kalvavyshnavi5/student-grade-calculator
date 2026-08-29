async function calculateGrade() {

    let name = document.getElementById("name").value.trim();

    let maths = document.getElementById("maths").value;
    let python = document.getElementById("python").value;
    let dbms = document.getElementById("dbms").value;
    let os = document.getElementById("os").value;
    let cn = document.getElementById("cn").value;

    if (name === "") {
        alert("Please enter student name!");
        return;
    }

    if (
        maths === "" ||
        python === "" ||
        dbms === "" ||
        os === "" ||
        cn === ""
    ) {
        alert("Please enter all subject marks!");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:5000/calculate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                maths: maths,
                python: python,
                dbms: dbms,
                os: os,
                cn: cn
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        let result = document.getElementById("result");

        result.style.display = "block";

        result.innerHTML = `
            <h2>🎉 Result</h2>

            <p><strong>Student:</strong> ${data.name}</p>

            <p><strong>Total Marks:</strong> ${data.total} / 500</p>

            <p><strong>Average:</strong> ${data.average}%</p>

            <p><strong>Grade:</strong> ${data.grade}</p>
        `;

    } catch (error) {

        alert("Backend connection failed! Please start Python server.");

        console.log(error);
    }
}