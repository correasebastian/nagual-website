Rails.application.routes.draw do
  get 'export/index'

  get 'import/index'

  post 'import/upload'

  root 'import#index'
end
