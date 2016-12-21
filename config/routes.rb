Rails.application.routes.draw do

  get 'import/index'

  post 'import/upload'

  root 'import#index'

end
