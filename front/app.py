from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
from docs import modify_and_encrypt_pdf, modify_docx, mask_pptx_file, mask_excel_file, encrypt_excel_file

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        processed_files = []

        # Determine file type and process accordingly
        if filename.endswith('.pdf'):
            output_pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], 'Masked_Output_Final.pdf')
            encrypted_pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], 'Encrypted_Masked_Output_Final.pdf')
            password = "securepassword"
            modify_and_encrypt_pdf(file_path, output_pdf_path, encrypted_pdf_path, password)
            processed_files.append('Encrypted_Masked_Output_Final.pdf')

        elif filename.endswith('.docx'):
            output_docx_path = os.path.join(app.config['UPLOAD_FOLDER'], 'Masked_Output_Final.docx')
            modify_docx(file_path, output_docx_path)
            processed_files.append('Masked_Output_Final.docx')

        elif filename.endswith('.pptx'):
            output_pptx_path = os.path.join(app.config['UPLOAD_FOLDER'], 'masked_presentation.pptx')
            mask_pptx_file(file_path, output_pptx_path)
            processed_files.append('masked_presentation.pptx')

        elif filename.endswith('.xlsx'):
            masked_excel_path = os.path.join(app.config['UPLOAD_FOLDER'], 'masked_spreadsheet.xlsx')
            encrypted_excel_path = os.path.join(app.config['UPLOAD_FOLDER'], 'encrypted_spreadsheet.xlsx')
            password = "securepassword"
            mask_excel_file(file_path, masked_excel_path)
            encrypt_excel_file(masked_excel_path, encrypted_excel_path, password)
            processed_files.append('encrypted_spreadsheet.xlsx')

        else:
            return jsonify({'msg': 'Unsupported file type'}), 400

        return jsonify({'msg': 'Files processed successfully', 'files': processed_files}), 200

@app.route('/uploads/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)