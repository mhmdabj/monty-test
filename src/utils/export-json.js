function Export(data) {

    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "name_ur_json.json";
    link.href = url;
    link.click();
}
export default Export;