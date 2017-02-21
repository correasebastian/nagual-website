# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170221155127) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "custom_attributes", force: :cascade do |t|
    t.string   "product_id"
    t.string   "name"
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "name"], name: "index_custom_attributes_on_product_id_and_name", unique: true, using: :btree
    t.index ["product_id"], name: "index_custom_attributes_on_product_id", using: :btree
  end

  create_table "job_history_entries", force: :cascade do |t|
    t.string   "processed_file_path"
    t.integer  "processed_records"
    t.string   "status"
    t.string   "report_file_path"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "prices", force: :cascade do |t|
    t.string   "product_id"
    t.decimal  "price",      precision: 15, scale: 4
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["product_id"], name: "index_prices_on_product_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "product_id"
    t.string   "ean"
    t.string   "upc"
    t.string   "unit"
    t.integer  "min_order_quantity"
    t.integer  "step_quantity"
    t.string   "display_name"
    t.string   "short_description"
    t.text     "long_description"
    t.boolean  "online_flag"
    t.datetime "online_from"
    t.datetime "online_to"
    t.boolean  "available_flag"
    t.string   "template"
    t.string   "tax_class_id"
    t.string   "brand"
    t.string   "manufacturer_name"
    t.string   "manufacturer_sku"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "master_product_id"
    t.string   "type"
    t.index ["product_id"], name: "index_products_on_product_id", unique: true, using: :btree
  end

  create_table "stocks", force: :cascade do |t|
    t.string   "product_id"
    t.boolean  "perpetual"
    t.integer  "stock"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_stocks_on_product_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  create_table "variation_attribute_values", force: :cascade do |t|
    t.string "variation_attribute_id"
    t.string "value"
    t.string "display_value"
    t.index ["variation_attribute_id", "value"], name: "var_attr_vals_index", unique: true, using: :btree
    t.index ["variation_attribute_id"], name: "index_variation_attribute_values_on_variation_attribute_id", using: :btree
  end

  create_table "variation_attributes", force: :cascade do |t|
    t.string "product_id"
    t.string "attribute_id"
    t.string "variation_attribute_id"
    t.string "display_value"
    t.index ["product_id", "attribute_id"], name: "index_variation_attributes_on_product_id_and_attribute_id", unique: true, using: :btree
    t.index ["product_id"], name: "index_variation_attributes_on_product_id", using: :btree
  end

end
