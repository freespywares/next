use crate::utils::http::{ImageHelper, ImageSource};
use actix_web::{get, web, Responder};
use std::time::Instant;

#[get("/flip/{orientation}")]
pub async fn flip_orientation(
    orientation: web::Path<String>,
    query: web::Query<ImageSource>,
) -> impl Responder {
    let orientation = orientation.into_inner();

    let start_time = Instant::now();

    if let Ok(image) = crate::utils::http::get_image_from_url(&query.url).await {
        match orientation.as_str() {
            "horizontal" => {
                let image = image.fliph();
                if let Ok(result) = ImageHelper::new(image).png_response(Some(start_time)) {
                    return result;
                }
            }
            "vertical" => {
                let image = image.flipv();
                if let Ok(result) = ImageHelper::new(image).png_response(Some(start_time)) {
                    return result;
                }
            }
            _ => {}
        }
    }

    crate::utils::http::empty_response()
}
