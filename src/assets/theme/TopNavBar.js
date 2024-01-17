import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) => {
    if (current_theme) {
        c_c("--nav_bg_color", "transparent")
        c_c("--nav_fixed_shadow", "#ffffff01")
        c_c("--nav_item_color", "#b5b9d6")
        c_c("--nav_item_active_color", "#e78287")
        c_c("--nav_item_hover_color", "#f67d61")

    } else {
        c_c("--nav_bg_color", "transparent")
        c_c("--nav_fixed_shadow", "#8e8e8e30")
        c_c("--nav_item_color", "#5e6d78")
        c_c("--nav_item_active_color", "#f67d61")
        c_c("--nav_item_hover_color", "#f76700")
    }
}

export default change_theme