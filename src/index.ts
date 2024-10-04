import { exec } from 'child_process'
import { join } from 'path'

const venvPath = join(__dirname, '..', 'connection', 'dx_mt5', 'Scripts')
const pythonScriptPath = join(__dirname, '..', 'connection', 'src', 'main.py')
const pythonExecutable = join(venvPath, 'python.exe')

function executarComando(comando: string) {
  return new Promise((resolve, reject) => {
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`)
        return reject(error)
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
      console.log(`stdout: ${stdout}`)
      resolve(stdout)
    })
  })
}

// Função para ativar o ambiente virtual e rodar o script Python
async function rodarPythonScript() {
  try {
    // Verificando qual comando de ativação usar (cmd ou PowerShell)
    const activateCommand = process.platform === 'win32' ? `${venvPath}\\activate.bat` : `${venvPath}\\Activate.ps1`

    // Ativando o ambiente virtual (opcional, depende se é necessário ativar antes no cmd)
    console.log('Ativando ambiente virtual...')
    await executarComando(`"${activateCommand}"`)

    // Executando o script Python
    console.log('Executando o script Python...')
    await executarComando(`"${pythonExecutable}" "${pythonScriptPath}"`)
  } catch (error) {
    console.error('Erro ao rodar o script Python:', error)
  }
}

// Chama a função para rodar o script Python
rodarPythonScript()
