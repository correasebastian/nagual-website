Rails.application.routes.draw do
  get 'export/index'

  get  'import/index'
  post 'import/upload'

  get  'data/*file' => 'application#data'

  root 'import#index'
end
