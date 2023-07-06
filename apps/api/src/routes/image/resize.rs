use crate::utils::http::{ImageHelper, ImageSource};
use actix_web::{get, web, Responder};
use std::time::Instant;

#[get("/resize/{width}/{height}")]
pub async fn resize(path: web::Path<(u32, u32)>, query: web::Query<ImageSource>) -> impl Responder {
	let (width, height) = path.into_inner();

	let start_time = Instant::now();

	if let Ok(image) = crate::utils::http::get_image_from_url(&query.url).await {
		let resized_image =
			image.resize_exact(width, height, image::imageops::FilterType::Triangle);

		if let Ok(result) = ImageHelper::new(resized_image).png_response(Some(start_time)) {
			return result;
		}
	}

	crate::utils::http::empty_response()
}
