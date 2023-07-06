use crate::utils::http::{ImageHelper, ImageSource};
use actix_web::{get, web, Responder};
use std::time::Instant;

#[get("/convert/{format}")]
pub async fn convert_type(
	format: web::Path<String>,
	query: web::Query<ImageSource>,
) -> impl Responder {
	let format = format.into_inner();

	let start_time = Instant::now();

	if let Ok(image) = crate::utils::http::get_image_from_url(&query.url).await {
		match format.as_str() {
			"png" => {
				if let Ok(result) = ImageHelper::new(image).png_response(Some(start_time)) {
					return result;
				}
			}
			"jpeg" => {
				if let Ok(result) = ImageHelper::new(image).jpeg_response(Some(start_time)) {
					return result;
				}
			}
			"webp" => {
				if let Ok(result) = ImageHelper::new(image).webp_response(Some(start_time)) {
					return result;
				}
			}
			_ => {}
		}
	}

	crate::utils::http::empty_response()
}
