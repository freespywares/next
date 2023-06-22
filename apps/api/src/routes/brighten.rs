use crate::utils::http::{ImageHelper, ImageSource};
use actix_web::{get, web, Responder};
use std::time::Instant;

#[get("/brighten/{value}")]
pub async fn brighten(value: web::Path<i32>, query: web::Query<ImageSource>) -> impl Responder {
    let value = value.into_inner();

    let start_time = Instant::now();
    
    if let Ok(image) = crate::utils::http::get_image_from_url(&query.url).await {
        let image = image.brighten(value);

        if let Ok(result) = ImageHelper::new(image).png_response(Some(start_time)) {
            return result;
        }
    }

    crate::utils::http::empty_response()
}
