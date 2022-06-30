
function AddPartition(ram_size, part_num){

    size = Math.floor(Math.random() * ram_size / 2) + 2;
    // alert('ram_size: ' + ram_size + '\nsize: ' + size);

    const ram = document.getElementById('ram');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.value = size;
    node1.id = 'partition-' + part_num;
    // const partition_size = document.createTextNode(size);

    // node1.appendChild(partition_size);
    node.appendChild(node1);
    node.className = 'partition';

    ram.appendChild(node);

    return ram_size - size;
}


function UpdateType(id) {
    
    if(id == 'static') {
        document.getElementById('partitions').disabled = false;
        document.getElementById('part-size').disabled = false;
    }
    else if (id == 'dynamic') {
        document.getElementById('partitions').disabled = true;
        document.getElementById('part-size').disabled = true;

        document.getElementById('ram').innerHTML = '';
    }
}

function UpdateMemory(id) {

    ram_size = document.getElementById(id).value;
    document.getElementById('ram-size').innerHTML = ram_size;
    document.getElementById('ram').innerHTML = '';

    let max_partition = ram_size / 2;

    document.getElementById('partitions').max = max_partition;
    document.getElementById('part-max').innerHTML = max_partition;

}

function UpdatePartitions(id) {

    partitions = document.getElementById(id).value;
    document.getElementById('ram').innerHTML = '';
    ram_size = document.getElementById('ram-size').innerHTML;
    max_part_size = ram_size / 2;

    for(i = 0; i < partitions; i++) {
        max_part_size = AddPartition(max_part_size, i + 1);
    }
}


function CheckRamPartitionSize() {

    partitions = document.getElementById('partitions').value;
    ram_size = document.getElementById('ram-size').innerHTML;
    total_partition_size = 0;

    for(i = 0; i < partitions; i++){
        size = document.getElementById('partition-' + (i + 1)).value;
        size = Number(size);
        total_partition_size += size;
    }
    if(total_partition_size != ram_size) {
        alert('Total partition size must be equal to RAM size!');
    }
    else {

    }

}

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



