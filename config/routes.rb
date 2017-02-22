Rails.application.routes.draw do
  devise_for :users

  get 'export/index'

  get  'import/index'
  post 'import/upload'

  get  'data/*file' => 'application#data'

  get 'help', to: 'help#index'

  root 'import#index'
end
