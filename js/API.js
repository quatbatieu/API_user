const baseUrl = "https://62a694e897b6156bff7bc30e.mockapi.io/api/Phone";

// hàm call API lấy danh sách sản phẩm
function apiGetProduct() {
  return axios({
    url: baseUrl,
    method: "GET",
  });
}
function apiGetProductdetail(productId) {
  return axios({
    url: `${baseUrl}/${productId}`,
    method: "GET",
  });
}
