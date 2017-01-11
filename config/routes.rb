Rails.application.routes.draw do

  get 'import/index'

  post 'import/upload'

  get 'import/run'

  root 'import#index'

end
